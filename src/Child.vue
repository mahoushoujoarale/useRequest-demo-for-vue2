<template>
  <div class="demo-container">
    <h3>result: <span>{{ result }}</span></h3>
    <h3>loading: <span>{{ loading }}</span></h3>
    <h3>error: <span>{{ error }}</span></h3>
    <h3>onCancel: <span>{{ onCancelStr }}</span></h3>
    <h3>onCache: <span>{{ onCacheStr }}</span></h3>
    <h3>onBefore: <span>{{ onBeforeStr }}</span></h3>
    <h3>onAfter: <span>{{ onAfterStr }}</span></h3>
    <h3>onSuccess: <span>{{ onSuccessStr }}</span></h3>
    <h3>onError: <span>{{ onErrorStr }}</span></h3>
    <button class="primary" @click="handleRun">run</button>
    <button @click="handleForceRun">forceRun</button>
    <button @click="cancel">cancel</button>
    <button @click="handleRunError">runError</button>
    <button @click="reset">reset</button>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { useRequest } from "@superarale/vue-use-request";
import { request, correctKey } from "./request";

export default {
  setup() {
    const onCancelStr = ref("");
    const onCacheStr = ref("");
    const onBeforeStr = ref("");
    const onAfterStr = ref("");
    const onSuccessStr = ref("");
    const onErrorStr = ref("");

    const onCancel = () => {
      onCancelStr.value = "onCancel triggered";
    };
    const onCache = (result) => {
      onCacheStr.value = `onCache triggered: ${JSON.stringify(result)}`;
    };
    const onBefore = () => {
      onBeforeStr.value = "onBefore triggered";
    };
    const onAfter = () => {
      onAfterStr.value = "onAfter triggered";
    };
    const onSuccess = (result) => {
      onSuccessStr.value = `onSuccess triggered: ${JSON.stringify(result)}`;
    };
    const onError = (error) => {
      onErrorStr.value = `onError triggered: ${error}`;
    };

    const reset = () => {
      result.value = null;
      loading.value = false;
      error.value = null;

      onCancelStr.value = "";
      onCacheStr.value = "";
      onBeforeStr.value = "";
      onAfterStr.value = "";
      onSuccessStr.value = "";
      onErrorStr.value = "";
    };

    const { result, loading, error, run, forceRun, cancel } = useRequest(
      request,
      {
        retryTimes: 3,
        cacheTime: 3000,
        onCancel,
        onCache,
        onBefore,
        onAfter,
        onSuccess,
        onError,
      }
    );

    const handleRun = () => {
      const params = {
        key: correctKey,
      };
      run(params);
    };
    const handleForceRun = () => {
      const params = {
        key: correctKey,
      };
      forceRun(params);
    };
    const handleRunError = () => {
      const params = {
        key: 'badkey',
      };
      run(params);
    };

    return {
      result,
      loading,
      error,
      onCancelStr,
      onCacheStr,
      onBeforeStr,
      onAfterStr,
      onSuccessStr,
      onErrorStr,
      reset,
      cancel,
      handleRun,
      handleForceRun,
      handleRunError,
    };
  },
};
</script>
