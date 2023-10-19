import { CallTracker } from 'assert';
import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
class Contract {
  num: number = 0

  @view({})
  get_number(): number {
    return this.num;
  }

  @call({})
  increase_number(): void {
    near.log("Increasing number by " + near.predecessorAccountId());
    this.num++;
  }

  @call({})
  decrease_number(): void {
    if (this.num == 0) {
      throw new Error("Can't decrease number")
    }

    // decrease number and log account call
    near.log("Decrease number by " + near.predecessorAccountId());
    this.num--;
  }

  @call({ privateFunction: true })
  reset_number(): void {
    this.num = 0;
  }

  @call({ payableFunction: true })
  payable_function(): void {
    near.log("User deposit amount: " + near.attachedDeposit());
    this.num += 10;
  }
}
