import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { initAxios } from 'src/utils/axios';
import { sign } from 'src/utils/gen-signature';

@Injectable()
export class MomoService {
  private axiosInstance: AxiosInstance;
  constructor(private configService: ConfigService) {
    this.axiosInstance = initAxios();
  }
  async checkout() {
    const {
      url,
      partnerCode,
      accessKey,
      secretKey,
      redirectUrl,
      ipnUrl,
      requestType,
    } = this.getConfig();
    console.log(this.getConfig());
    const requestId = partnerCode + new Date().getTime();
    const dataRaw = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${5000}&orderId=${requestId}&orderInfo=${{}}&returnUrl=${redirectUrl}&notifyUrl=${ipnUrl}&extraData=${{}}`;
    const signature = sign(dataRaw, secretKey);
    try {
      // const res = await axios({
      //   method: 'POST',
      //   headers: { 'content-type': 'application/json' },
      //   url,
      //   data: {
      //     accessKey: accessKey,
      //     partnerCode: partnerCode,
      //     requestType,
      //     notifyUrl: ipnUrl,
      //     returnUrl: redirectUrl,
      //     orderId: requestId,
      //     amount: 5000,
      //     orderInfo: {},
      //     requestId,
      //     extraData: {},
      //     signature,
      //   },
      // });

      const res = await this.axiosInstance.post(url, {
        accessKey: accessKey,
        partnerCode: partnerCode,
        requestType,
        notifyUrl: ipnUrl,
        returnUrl: redirectUrl,
        orderId: requestId,
        amount: 5000,
        orderInfo: {},
        requestId,
        extraData: {},
        signature,
      });

      return res;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  getConfig() {
    return {
      url: this.configService.get('momo.url'),
      partnerCode: this.configService.get('momo.partnerCode'),
      accessKey: this.configService.get('momo.accessKey'),
      secretKey: this.configService.get('momo.secretKey'),
      redirectUrl: this.configService.get('momo.redirectUrl'),
      ipnUrl: this.configService.get('momo.ipnUrl'),
      requestType: this.configService.get('momo.requestType'),
    };
  }
}
