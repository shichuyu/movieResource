const bcrypt = require('bcrypt'); // 跨平台的文件加密工具

// 用户密码加盐加密，saltTimes为加密的次数
const encrypt = async(password, saltTimes) => {
	const hash = await bcrypt.hash(password, saltTimes);
	return hash;
}

// 登录时，用户输入密码与后台密码的比对
const validate = async(password, hash) => {
	const match = await bcrypt.compare(passsword, hash);
	return match;
}

module.exports = {
	encrypt,
	validate
}