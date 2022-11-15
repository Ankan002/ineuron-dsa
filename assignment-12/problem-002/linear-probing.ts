class HashTable {
    MAX_SIZE: number;
    numArray: Array<[string, number]>;
    NUMBER_OF_SPACES_OCCUPIED: number;

    constructor(){
        this.MAX_SIZE = 10;
        this.numArray = new Array(this.MAX_SIZE);
        this.NUMBER_OF_SPACES_OCCUPIED = 0;
    }

    hashFunction(key: string): number {
        let characterOrdValue = 0;

        for(let i=0; i<key.length; i++){
            characterOrdValue += key.charCodeAt(i);
        }

        return characterOrdValue % this.MAX_SIZE;
    }

    linearProbe(indexGeneratedByHashFunction: number, numOfFailure: number): number {
        return ((indexGeneratedByHashFunction + numOfFailure) % this.MAX_SIZE);
    }

    addNum(key: string,val: number): void {
        if(this.NUMBER_OF_SPACES_OCCUPIED >= 10) throw new Error("Out of memory bound!!");

        const hashIndex = this.hashFunction(key);

        if(!this.numArray[hashIndex]) {
            this.numArray[hashIndex] = [key, val];
            this.NUMBER_OF_SPACES_OCCUPIED++;
            return;
        }

        for(let i=1; i<=this.MAX_SIZE; i++){
            let probedIndex = this.linearProbe(hashIndex, i);

            if(!this.numArray[probedIndex]){
                this.numArray[probedIndex] = [key, val];
                this.NUMBER_OF_SPACES_OCCUPIED++;
                return;
            }
        }

        throw new Error("Bro your key is huge and you will never get to an answer so, stop wasting both of our time...");
    }

    getNum(key: string): number | undefined {
        const hashIndex = this.hashFunction(key);

        if(!this.numArray[hashIndex]) return undefined;
        if(this.numArray[hashIndex][0] === key) return this.numArray[hashIndex][1];

        for(let i=1; i<=this.MAX_SIZE; i++){
            let probedIndex = this.linearProbe(hashIndex, i);

            if(this.numArray[probedIndex] && this.numArray[probedIndex][0] === key) return this.numArray[probedIndex][1];
        }

        return undefined;
    }

    deleteNum(key: string): void {
        const hashIndex = this.hashFunction(key);

        if(!this.numArray[hashIndex]) return;
        if(this.numArray[hashIndex][0] === key) {
            delete this.numArray[hashIndex];
            this.NUMBER_OF_SPACES_OCCUPIED--;
            return;
        }

        for(let i=1;i<this.MAX_SIZE; i++){
            let probedIndex = this.linearProbe(hashIndex, i);

            if(this.numArray[probedIndex] && this.numArray[probedIndex][0] === key){
                delete this.numArray[probedIndex];
                this.NUMBER_OF_SPACES_OCCUPIED--;
                return;
            }
        }
    }
}

// ? Driver code
const hashTable = new HashTable();

hashTable.addNum("May 2020", 1);
hashTable.addNum("May 2021", 2);
hashTable.addNum("May 2022", 3);
hashTable.addNum("May 2023", 4);
hashTable.addNum("May 2024", 5);
hashTable.addNum("May 2025", 6);
hashTable.addNum("May 2026", 7);
hashTable.addNum("May 2027", 8);
hashTable.addNum("May 2028", 9);
hashTable.addNum("May 2029", 10);

console.log(hashTable.getNum("May 2023"));
console.log(hashTable.getNum("May 2027"));

hashTable.deleteNum("May 2027");

console.log(hashTable.getNum("May 2027"));