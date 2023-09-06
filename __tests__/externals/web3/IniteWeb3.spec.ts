import Initweb3 from "../../../src/externals/web3/initweb3";
import {Web3} from "web3";

describe('test web3 init module', function () {

    it("should test web3 init module", () => {

        const module = Initweb3.getInstance();
        expect(true).toBe(true);

    })

});