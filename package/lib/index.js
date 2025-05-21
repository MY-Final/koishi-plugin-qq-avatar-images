"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.usage = exports.name = void 0;
const koishi_1 = require("koishi");
exports.name = "qq-avatar";
exports.usage = `get+@你想获取头像的用户
get+QQ号 获取指定QQ号的头像
支持同时获取多个用户的头像，如：get @用户1 @用户2 或 get 123456 789012
`;
const logger = new koishi_1.Logger("qq-avatar");
exports.Config = koishi_1.Schema.object({});
function apply(ctx) {
    const cmd = ctx
        .command("get", "获取用户QQ头像")
        .alias("头像")
        .action(({ session }, input) => {
        if (!input) {
            session.send("格式不正确，请使用 get+@用户 或 get+QQ号");
            return;
        }
        
        // 解析输入，处理@用户
        const segments = koishi_1.h.parse(input);
        logger.info(segments);
        let foundUser = false;
        
        // 处理@用户
        segments.forEach((segment) => {
            if (segment.type === "at") {
                foundUser = true;
                session.send(segment.attrs.id);
                session.send(koishi_1.h.image(`http://q.qlogo.cn/headimg_dl?dst_uin=${segment.attrs.id}&spec=640&img_type=jpg`));
            }
        });
        
        // 处理QQ号（支持多个）
        const words = input.split(/\s+/);
        words.forEach(word => {
            if (/^\d+$/.test(word)) {
                foundUser = true;
                const qqNumber = word.trim();
                session.send(`获取QQ号：${qqNumber}的头像`);
                session.send(koishi_1.h.image(`http://q.qlogo.cn/headimg_dl?dst_uin=${qqNumber}&spec=640&img_type=jpg`));
            }
        });
        
        if (foundUser) {
            session.send("获取成功");
        } else {
            session.send("格式不正确，请使用 get+@用户 或 get+QQ号");
        }
    });
}
exports.apply = apply;
