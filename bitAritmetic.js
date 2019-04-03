var hexLookupTable = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

function numToInt(num) {
	var zahl = 0;
	for (var i = num.length-1; i >= 0; i--) {
		zahl = zahl << 1;
		if (num[i]) {
			zahl |= 1;
		}
	}
	return zahl
}

function numToHex(num) {
	var erg = "";
	for (var i = 0;  i < num.length; i += 4) {
		var zahl = 0;
		if (num[i]) {
			zahl |= 0b0001;
		}
		if (num[i+1]) {
			zahl |= 0b0010;
		}
		if (num[i+2]) {
			zahl |= 0b0100;
		}
		if (num[i+3]) {
			zahl |= 0b1000;
		}
		erg = hexLookupTable[zahl] + erg;
	}
	return erg;
}

function intToNum(intNum) {
	var out = [];
	var zahl = intNum;
	var i = 0;
	while (zahl > 0) {
		out[i] = ((zahl % 2) == 1);
		zahl = Math.floor(zahl / 2);
		i++;
	}
	return out;
}

function hexToNum(str) {
	var num = [];
	for (var i = 0; i < str.length; i++) {
		var zahl = hexLookupTable.indexOf(str[str.length-i-1]);
		if ((zahl&0b0001) == 0b0001) {
			num[i*4] = true;
		} else {
			num[i*4] = false;
		}
		if ((zahl&0b0010) == 0b0010) {
			num[i*4+1] = true;
		} else {
			num[i*4+1] = false;
		}
		if ((zahl&0b0100) == 0b0100) {
			num[i*4+2] = true;
		} else {
			num[i*4+2] = false;
		}
		if ((zahl&0b1000) == 0b1000) {
			num[i*4+3] = true;
		} else {
			num[i*4+3] = false;
		}
	}
	return num;
}
		
function addNum(num1, num2) {
	var out = [];
	if (num1.length < num2.length) {
		for (var i = num1.length; i < num2.length; i++) {
			num1[i] = false;
		}
	} else if (num1.length > num2.length) {
		for (var i = num2.length; i < num1.length; i++) {
			num2[i] = false;
		}
	}
	var uebertrag = false;
	for (var i = 0;  i < num1.length; i++) {
		out[i] = ((num1[i] != num2[i]) != uebertrag);
		uebertrag = (num1[i] && num2[i])||(num1[i] && uebertrag)||(uebertrag && num2[i])
	}
	if (uebertrag) {
		out[num1.length] = uebertrag;
	}
	return out;
}

function multNum(num1, num2) {
	var out = [];
	for (var i = 0; i < num1.length; i++) {
		var zwSum = [];
		for (var k = 0; k < i; k++) {
			zwSum[k] = false;
		}
		for (var j = 0; j < num2.length; j++) {
			zwSum[i+j] = (num1[i] && num2[j]);
		}
		//console.log(zwSum);
		out = addNum(out, zwSum);
	}
	return out;
}

function shiftRight(num, anz) {
	var out = [];
	for (var i = 0; i < num.length-anz; i++) {
		out[i] = num[i+anz];
	}
	for (var i = num.length-anz;  i < num.length; i++) {
		out[i] = false;
	}
	return out;
}

function shiftLeft(num, anz) {
	var out = [];
	for (var i = num.length-1; i >= anz; i--) {
		out[i] = num[i-anz];
	}
	for (var i = anz-1;  i >= 0; i--) {
		out[i] = false;
	}
	return out;
}

function isGreaterEq(num1, num2) {
	if (num1.length < num2.length) {
		for (var i = num1.length; i < num2.length; i++) {
			num1[i] = false;
		}
	} else if (num1.length > num2.length) {
		for (var i = num2.length; i < num1.length; i++) {
			num2[i] = false;
		}
	}
	for (var i = num1.length-1; i >= 0; i--) {
		if (num1[i] && !num2[i]) {
			return true;
			break;
		}
		if (!num1[i] && num2[i]) {
			return false;
			break;
		}
	}
	return true;
}

function isGreater(num1, num2) {
	if (num1.length < num2.length) {
		for (var i = num1.length; i < num2.length; i++) {
			num1[i] = false;
		}
	} else if (num1.length > num2.length) {
		for (var i = num2.length; i < num1.length; i++) {
			num2[i] = false;
		}
	}
	for (var i = num1.length-1; i >= 0; i--) {
		if (num1[i] && !num2[i]) {
			return true;
			break;
		}
		if (!num1[i] && num2[i]) {
			return false;
			break;
		}
	}
	return false;
}

function moduloNum(num1, num2) {
	var nummer1 = num1;
	while (isGreaterEq(nummer1, num2)) {
		nummer1 = subNum(nummer1, num2);
	}
	return nummer1;
}

function subNum(num1, num2) {
	var out = [];
	if (num1.length < num2.length) {
		for (var i = num1.length; i < num2.length; i++) {
			num1[i] = false;
		}
	} else if (num1.length > num2.length) {
		for (var i = num2.length; i < num1.length; i++) {
			num2[i] = false;
		}
	}
	var uebertrag = false;
	for (var i = 0;  i < num1.length; i++) {
		out[i] = ((num1[i] != num2[i]) != uebertrag);
		uebertrag = ((num2[i] && uebertrag)||((num2[i] || uebertrag) && !num1[i]))
	}
	return out;
}

function numIsGerade(num) {
	if (num[0]) {
		return false;
	}
	return true;
}

function multPotNum(textInt, keyNum, modulInt) {
	var basis = intToNum(textInt);
	var exp = intToNum(keyNum);
	var mod = intToNum(modulInt);
	var pot = [true];
	//console.log(pot + "\t" + basis + "\t" + exp);
	while (isGreater(exp, [])) {
		if (numIsGerade(exp)) {
			exp = shiftRight(exp, 1);
			basis = moduloNum(multNum(basis, basis), mod);
		} else {
			exp = subNum(exp, [true]);
			pot = moduloNum(multNum(pot, basis), mod);
		}
		//console.log(pot + "\t" + basis + "\t" + exp);
	}
	return numToInt(pot);
}