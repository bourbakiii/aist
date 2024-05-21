<template>
    <div>
        <div
            ref="swiperNode"
            class="swiper -m-4 p-4"
        >
            <div class="swiper-wrapper">
                <div
                    v-for="ticket in sortedTickets.slice(0, 5)"
                    :key="ticket.id"
                    class="swiper-slide w-[102px]"
                >
                    <TicketCard
                        @click="
                            () => {
                                if (selectedTicket && selectedTicket.id === ticket.id) {
                                    selectedTicket = null;
                                    return;
                                }

                                selectedTicket = ticket;
                            }
                        "
                        :start-date="ticket.start"
                        :end-date="ticket.end"
                        :active="selectedTicket?.id === ticket.id"
                    />
                </div>
            </div>
        </div>

        <div class="mt-6">
            <button
                @click="showModal = true"
                class="font-semibold text-aist-green hover:underline focus:underline"
            >
                Указать другую дату
            </button>
        </div>

        <Teleport to="body">
            <BaseAdaptiveModal
                @back="showModal = false"
                :show="showModal"
                :title="'Доставка'"
            >
                <div class="container">
                    <BaseAccordion
                        :init-active-index="
                            selectedTicketIndexInPackedTickets !== false
                                ? selectedTicketIndexInPackedTickets
                                : undefined
                        "
                    >
                        <BaseAccordionItem
                            v-for="packedTicket in packedTickets"
                            :key="packedTicket.date.getTime()"
                        >
                            <template #header>
                                {{ dayjs(packedTicket.date).locale('ru').format('DD MMMM') }}
                            </template>

                            <template #default>
                                <div class="space-y-4 px-2">
                                    <div
                                        v-for="ticket in packedTicket.children"
                                        :key="ticket.id"
                                    >
                                        <div>
                                            <BaseRadio
                                                v-model="selectedTicket"
                                                :value="ticket"
                                            >
                                                {{ dayjs(ticket.start).format('HH:mm') }} -
                                                {{ dayjs(ticket.end).format('HH:mm') }}
                                            </BaseRadio>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </BaseAccordionItem>
                    </BaseAccordion>
                </div>
            </BaseAdaptiveModal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs';
    import 'dayjs/locale/ru';
    import Swiper from 'swiper';

    interface Ticket {
        id: string;
        start: Date;
        end: Date;
    }

    const props = defineProps<{
        modelValue: Ticket | null;
        tickets: Ticket[];
    }>();

    const emit = defineEmits<{
        'update:modelValue': [value: Ticket | null];
    }>();

    const selectedTicket = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        },
    });

    const sortedTickets = computed(() => {
        return props.tickets.sort((a, b) => {
            return (
                Math.floor(Number(a.start.getTime()) / 1000) -
                Math.floor(Number(b.start.getTime()) / 1000)
            );
        });
    });

    const packedTickets = computed(() => {
        const array: {
            date: Date;
            children: {
                id: string;
                start: Date;
                end: Date;
            }[];
        }[] = [];

        sortedTickets.value.forEach((ticket) => {
            const dayJs = dayjs(ticket.start);

            const findedIndex = array.findIndex((sortedTicket) => {
                return dayJs.isSame(sortedTicket.date, 'day');
            });

            if (findedIndex !== -1) {
                array[findedIndex].children.push(ticket);

                return;
            }

            array.push({
                date: ticket.start,
                children: [
                    {
                        ...ticket,
                    },
                ],
            });
        });

        return array;
    });

    const selectedTicketIndexInSortedTickets = computed<number | false>(() => {
        const index = sortedTickets.value.findIndex((ticket) => {
            return ticket.id === selectedTicket.value?.id;
        });

        if (index !== -1) {
            return index;
        }

        return false;
    });

    const selectedTicketIndexInPackedTickets = computed<number | false>(() => {
        const index = packedTickets.value.findIndex((packedTicket) => {
            return packedTicket.children.find((ticket) => {
                return ticket.id === selectedTicket.value?.id;
            });
        });

        if (index === -1) {
            return false;
        }

        return index;
    });

    let swiper: Swiper | null = null;
    const swiperNode = ref<HTMLDivElement | null>(null);

    onMounted(() => {
        swiper = new Swiper(swiperNode.value!, {
            slidesPerView: 'auto',
            spaceBetween: 16,
        });

        if (selectedTicketIndexInSortedTickets.value) {
            swiper.slideTo(selectedTicketIndexInSortedTickets.value, 0);
        }
    });

    onUpdated(() => {
        swiper?.update();
    });

    onUnmounted(() => {
        swiper?.destroy();
    });

    const showModal = ref<boolean>(false);
</script>
