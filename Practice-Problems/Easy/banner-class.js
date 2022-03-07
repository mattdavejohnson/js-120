// Banner Class
// Complete the Banner class so that the test cases shown work as intended.

class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log(
      [
        this.horizontalRule(),
        this.emptyLine(),
        this.messageLine(),
        this.emptyLine(),
        this.horizontalRule(),
      ].join('\n')
    );
  }

  horizontalRule() {
    let middle = '-'.repeat(this.message.length + 2);
    return '+' + middle + '+';
  }

  emptyLine() {
    let middle = ' '.repeat(this.message.length + 2);
    return '|' + middle + '|';
  }

  messageLine() {
    return `| ${this.message} |`;
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+
