class Edge {
	constructor() {
		this.src = 0;
		this.dest = 0;
	}
}

class SubSet {
	constructor(i) {
		this.parent = i;
		this.rank = 0;
	}
}

class UF {
	constructor(N) {
		this.subsets = Array.from(Array(N), (_, i) => {
			return new SubSet(i);
		});
	}

	find(i) {
		if (this.subsets[i].parent == i) {
			return i;
		} else {
			return this.find(this.subsets[i].parent);
		}
	}

	union(x, y) {
		const xroot = this.find(x);
		const yroot = this.find(y);
		if (this.subsets[xroot].rank < this.subsets[yroot].rank) {
			this.subsets[xroot].parent = yroot;
		} else if (this.subsets[xroot].rank > this.subsets[yroot].rank) {
			this.subsets[yroot].parent = xroot;
		} else {
			this.subsets[xroot].parent = yroot;
			this.subsets[yroot].rank++;
		}
	}
}

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

let uf;
readline.on('line', function (line) {
	const input = line.split(' ').map(Number);
	if (input.length == 1) {
		uf = new UF(input[0] + 1);
	} else {
		const [s, d] = input;
		uf.union(s, d);
	}
}).on('close', function () {
	let p = uf.find(1);
	for (let i = 2; i < uf.subsets.length; i++) {
		if (p != uf.find(i)) {
			console.log(1, i);
			process.exit();
		}
	}
});
