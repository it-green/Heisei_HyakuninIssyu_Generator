declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare interface Imgs {
    [keys: string]: string | string[];
}
