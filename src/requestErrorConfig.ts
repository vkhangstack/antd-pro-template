import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

// Sơ đồ xử lý lỗi: loại lỗi
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// Định dạng dữ liệu phản hồi đã đồng ý với phụ trợ
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name xử lý lỗi
 * pro Xử lý lỗi tích hợp, bạn có thể thực hiện các thay đổi của riêng mình tại đây
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // Xử lý lỗi: sơ đồ xử lý lỗi của umi@3.
  errorConfig: {
    // ném lỗi
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // ném lỗi homebrew
      }
    },
    // Tiếp nhận và xử lý lỗi
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // Tiếp nhận và xử lý lỗi
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warn(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios sai lầm, điều sai, ngộ nhận
        // Yêu cầu đã được thực hiện thành công và máy chủ đã phản hồi bằng mã trạng thái, nhưng mã trạng thái nằm ngoài phạm vi 2xx
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // Yêu cầu đã được thực hiện thành công, nhưng không nhận được phản hồi
        // \`error.request\` là một phiên bản của XMLHttpRequest trong trình duyệt,
        // trong khi ở node.js là một phiên bản của http.ClientRequest
        message.error('None response! Please retry.');
      } else {
        // Đã xảy ra lỗi khi gửi yêu cầu
        message.error('Request error, please retry.');
      }
    },
  },

  // yêu cầu đánh chặn
  requestInterceptors: [
    (config: RequestOptions) => {
      // Cấu hình yêu cầu chặn để xử lý được cá nhân hóa.
      const url = config?.url?.concat('?token = 123');
      return { ...config, url };
    },
  ],

  // đánh chặn phản ứng
  responseInterceptors: [
    (response) => {
      //Chặn dữ liệu phản hồi để xử lý được cá nhân hóa
      const { data } = response as unknown as ResponseStructure;

      if (data?.success === false) {
        message.error('Request failed!');
      }
      return response;
    },
  ],
};
