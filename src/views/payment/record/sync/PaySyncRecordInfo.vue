<template>
  <basic-modal
    title="查看同步信息"
    v-bind="$attrs"
    :loading="confirmLoading"
    :width="750"
    :visible="visible"
    :mask-closable="showable"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-descriptions title="" :column="{ md: 1, sm: 1, xs: 1 }">
        <a-descriptions-item label="本地交易号">
          {{ form.tradeNo }}
        </a-descriptions-item>
        <a-descriptions-item label="本地交易号">
          {{ form.bizTradeNo }}
        </a-descriptions-item>
        <a-descriptions-item label="外部交易号">
          {{ form.outTradeNo || '无' }}
        </a-descriptions-item>
        <a-descriptions-item label="同步类型">
          <a-tag>{{ dictConvert('PaymentType', form.syncType) }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="同步通道">
          <a-tag> {{ dictConvert('AsyncPayChannel', form.channel) }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="同步结果">
          <a-tag v-if="form.syncType === 'pay'">{{ dictConvert('PaySyncStatus', form.outTradeStatus) }}</a-tag>
          <a-tag v-else>{{ dictConvert('RefundSyncStatus', form.outTradeStatus) }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="修复单号">
          <a-tag v-if="form.repair" color="green"> {{ form.repairNo }} </a-tag>
          <a-tag v-else>无需修复</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="同步时间">
          {{ form.createTime }}
        </a-descriptions-item>
        <a-descriptions-item label="同步消息">
          <json-preview :data="XEUtils.toStringJSON(form.syncInfo || '{}')" />
        </a-descriptions-item>
        <a-descriptions-item label="错误信息" v-if="form.errorMsg">
          {{ form.errorMsg }}
        </a-descriptions-item>
        <a-descriptions-item label="客户端IP">
          {{ form.clientIp }}
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>
    <template #footer>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
    </template>
  </basic-modal>
</template>

<script lang="ts" setup>
  import { $ref } from 'vue/macros'
  import useFormEdit from '/@/hooks/bootx/useFormEdit'
  import { get, SyncRecord } from './PaySyncRecord.api'
  import { FormInstance } from 'ant-design-vue/lib/form'
  import { BasicModal } from '/@/components/Modal'
  import { useDict } from '/@/hooks/bootx/useDict'
  import JsonPreview from '/@/components/CodeEditor/src/json-preview/JsonPreview.vue'
  import XEUtils from 'xe-utils'

  const {
    initFormEditType,
    handleCancel,
    search,
    labelCol,
    wrapperCol,
    modalWidth,
    title,
    confirmLoading,
    visible,
    editable,
    showable,
    formEditType,
  } = useFormEdit()
  const { dictConvert } = useDict()

  // 表单
  const formRef = $ref<FormInstance>()
  let form = $ref<SyncRecord>({})
  // 入口
  function init(id) {
    visible.value = true
    confirmLoading.value = true
    get(id).then(({ data }) => {
      form = data
      confirmLoading.value = false
    })
  }

  defineExpose({
    init,
  })
</script>

<style lang="less" scoped></style>
