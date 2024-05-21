<template>
    <button
        :class="{
            '!bg-aist-green !text-white': props.active,
        }"
        class="shadow-aist flex w-full flex-col items-stretch rounded-[10px] bg-white p-2 text-right text-sm hover:bg-aist-green/10 focus:bg-aist-green/10"
    >
        <span>
            {{ dayjs(props.startDate).format('HH:mm') }} -
            {{ dayjs(props.endDate).format('HH:mm') }}
        </span>

        <span class="mt-4 font-semibold">{{ relativeDate }}</span>
    </button>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs';

    const props = defineProps<{
        startDate: Date;
        endDate: Date;
        active?: boolean;
    }>();

    const relativeDate = computed<string>(() => {
        const todaysDate = new Date();
        const tomorrowDate = new Date();

        tomorrowDate.setDate(tomorrowDate.getDate() + 1);

        if (dayjs(todaysDate).isSame(props.startDate, 'day')) {
            return 'Сегодня';
        } else if (dayjs(tomorrowDate).isSame(props.startDate, 'day')) {
            return 'Завтра';
        } else {
            return dayjs(props.startDate).format('DD.MM');
        }
    });
</script>
