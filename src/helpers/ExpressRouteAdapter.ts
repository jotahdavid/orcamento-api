import { Request, Response } from 'express';

interface HttpRequestQuery {
  [key: string]: undefined | string | string[] | HttpRequestQuery | HttpRequestQuery[]
}

export interface HttpRequest {
  body: any;
  query: HttpRequestQuery;
  params: Record<string, string | undefined>;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}

export type HttpRequestHandler = (httpRequest: HttpRequest) => HttpResponse | Promise<HttpResponse>;

class ExpressRouteAdapter {
  adapt(requestHandler: HttpRequestHandler) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      try {
        const httpResponse = await requestHandler(httpRequest);
        return res.status(httpResponse.statusCode).json(httpResponse.body);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.sendStatus(500);
      }
    };
  }
}

export default new ExpressRouteAdapter();
