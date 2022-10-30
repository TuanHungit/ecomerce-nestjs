import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { initAxios } from 'src/utils/axios';
import { sign } from 'src/utils/gen-signature';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Injectable()
export class MomoService {
  private axiosInstance: AxiosInstance;
  constructor(private configService: ConfigService) {
    this.axiosInstance = initAxios();
  }
  async checkout(data: CreatePaymentDto) {
    console.log(data);
    const {
      url,
      partnerCode,
      accessKey,
      secretKey,
      redirectUrl,
      ipnUrl,
      requestType,
    } = this.getConfig();
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

// thông tin về tài khoản MOMO ở bước 2
// const partnerCode = 'MOMO_ATM_DEV';
// const accessKey = 'w9gEg8bjA2AM2Cvr';
// const serectkey = 'mD9QAVi4cm9N844jh5Y2tqjWaaJoGVFM';
// const returnUrl = 'http://localhost:3000/comfirm';
// const notifyurl = 'http://localhost:3000/comfirm';
// const requestType = 'payWithATM';
// const extraData = 'eyJ1c2VybmFtZSI6ICJtb21vIn0=';

// router.get('/payment/:id/:amount', async (request, response) => {
//   // Tạo mã requestId
//   const requestId = 'REQ' + getRndInteger(100, 1000);
//   // Số tiền giao dịch
//   const amount = request.params.amount;
//   // tạo mã đơn hàng orderId
//   const orderId = 'OR' + request.params.id + getRndInteger(100, 1000);
//   const orderInfo = 'demo_test_MOMO';
//   var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${notifyurl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${returnUrl}&requestId=${requestId}&requestType=${requestType}`;
//   var signature = crypto
//     .createHmac('sha256', serectkey)
//     .update(rawSignature)
//     .digest('hex');

//   var body = JSON.stringify({
//     accessKey: accessKey,
//     amount: amount,
//     extraData: extraData,
//     ipnUrl: notifyurl,
//     orderId: orderId,
//     orderInfo: orderInfo,
//     partnerCode: partnerCode,
//     redirectUrl: returnUrl,
//     requestId: requestId,
//     requestType: requestType,
//     lang: 'vi',
//     signature: signature,
//   });
//   var options = {
//     hostname: 'test-payment.momo.vn',
//     port: 443,
//     path: '/v2/gateway/api/create',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Content-Length': Buffer.byteLength(body),
//     },
//   };
//   var req = await https.request(options, (res) => {
//     res.setEncoding('utf8');
//     res.on('data', (body) => {
//       console.log(body);
//       response.redirect(JSON.parse(body).payUrl);
//     });
//     res.on('end', () => {
//       console.log('No more data in response.');
//     });
//   });
//   req.write(body);
//   req.end();
// });

// function getRndInteger(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// router.post('/comfirm', (req, res) => {
//   console.log(req.query);
//   var data = Object.assign([], req.query);
//   data.isSuccess = false;
//   if (req.query.errorCode == '0') {
//     data.isSuccess = true;
//   }
//   res.render('Comfirm', { data: data });
// });

// router.get('/comfirm', (req, res) => {
//   console.log(req.query);
//   var data = Object.assign([], req.query);
//   data.isSuccess = false;
//   if (req.query.errorCode == '0') {
//     data.isSuccess = true;
//   }
//   res.render('Comfirm', { data: data });
// });
