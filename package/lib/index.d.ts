import { Context, Schema } from "koishi";
export declare const name = "qq-avatar";
export declare const usage = "get+@\u4F60\u60F3\u83B7\u53D6\u5934\u50CF\u7684\u7528\u6237\nget+QQ\u53F7 \u83B7\u53D6\u6307\u5B9AQQ\u53F7\u7684\u5934\u50CF\n";
export interface Config {
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context): void;
