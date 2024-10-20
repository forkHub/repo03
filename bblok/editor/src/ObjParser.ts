namespace ha.blockly {
	export class Obj {
		static parse(obj: any, depth = 0): void {
			depth++;
			console.log('parse obj, d ' + depth);

			if (depth > 2) return;

			for (let i in obj) {
				console.log(i + '/' + typeof (i));
				let j: any = i;
				if (obj[j] instanceof Object) {
					Obj.parse(obj[j], depth);
				}
			}

		}
	}
}