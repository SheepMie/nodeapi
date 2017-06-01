exports.addUser = function (req,res) {
    var nickname = req.body.nickname ? req.body.nickname.replace(/(^\s+)|(\s+$)/g, "") : '';
	var email = req.body.email ? req.body.email.replace(/(^\s+)|(\s+$)/g, "") : '';
	var password = req.body.password;
	var passwordRepeat = req.body.passwordRepeat;
	var NICKNAME_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
	var EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	var errorMsg;
	if (nickname === '') {
		errorMsg = "昵称不能为空";
	} else if (email === '') {
		errorMsg = "邮箱地址不能为空";
	} else if (nickname.length <= 3 || nickname.length > 9 || !NICKNAME_REGEXP.test(nickname)) {
		//不符合呢称规定.
		errorMsg = "呢称不合法";
	} else if (email.length <= 4 || email.length > 30 || !EMAIL_REGEXP.test(email)) {
		errorMsg = "邮箱地址不合法";
	} else if (password.length <= 5 || password.length > 15) {
		errorMsg = "密码不合法";
	} else if (password !== passwordRepeat) {
		errorMsg = "两次输入的密码不一致";
	}
	if (errorMsg) {
		return res.status(401).send({errorMsg: errorMsg});
	}else{
		return res.status(200).send({success: 'aha'});
	}
};