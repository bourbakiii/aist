import type { InjectionKey } from 'vue';

const authorizationModalKey = Symbol() as InjectionKey<Ref<boolean>>;

export default authorizationModalKey;
