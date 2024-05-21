import type { InjectionKey } from 'vue';

const headerTitleKey = Symbol() as InjectionKey<Ref<string>>;

export default headerTitleKey;
