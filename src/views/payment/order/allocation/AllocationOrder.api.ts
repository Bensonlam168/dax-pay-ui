import { defHttp } from '/@/utils/http/axios'
import { PageResult, Result } from '/#/axios'
import { BaseEntity } from '/#/web'
import { LabeledValue } from 'ant-design-vue/lib/select'

/**
 * 获取可以分账的通道
 */
export function findChannels() {
  return defHttp.get<Result<LabeledValue[]>>({
    url: '/allocation/order/findChannels',
  })
}

/**
 * 分页
 */
export function page(params) {
  return defHttp.get<Result<PageResult<AllocationOrder>>>({
    url: '/allocation/order/page',
    params,
  })
}

/**
 * 查询详情
 */
export function get(id: string) {
  return defHttp.get<Result<AllocationOrder>>({
    url: '/allocation/order/findById',
    params: { id },
  })
}

/**
 * 明细列表
 */
export function detailList(orderId: string) {
  return defHttp.get<Result<AllocationOrderDetail[]>>({
    url: '/allocation/order/detail/findAll',
    params: { orderId },
  })
}

/**
 * 明细详情
 */
export function detail(id: string) {
  return defHttp.get<Result<AllocationOrderDetail>>({
    url: '/allocation/order/detail/findById',
    params: { id },
  })
}

/**
 * 分账订单
 */
export interface AllocationOrder extends BaseEntity {
  // 支付订单ID
  paymentId?: string
  // 支付标题
  title?: string
  // 网关支付订单号
  gatewayPayOrderNo?: string
  // 网关分账单号
  gatewayAllocationNo?: string
  // 分账单号
  allocationNo?: string
  // 外部请求号
  outReqNo?: string
  // 所属通道
  channel?: string
  // 总分账金额
  amount?: number
  // 分账描述
  description?: string
  // 状态
  status?: string
  // 错误原因
  errorMsg?: string
  // 完成时间
  finishTime?: string
}

/**
 * 分账订单明细
 */
export interface AllocationOrderDetail extends BaseEntity {
  // 分账订单ID
  orderId?: string
  // 分账明细单号
  receiverId?: string
  // 分账明细状态
  rate?: number
  // 分账明细状态
  amount?: number
  // 分账接收方类型
  receiverType?: string
  // 接收方账号
  receiverAccount?: string
  // 接收方姓名
  receiverName?: string
}