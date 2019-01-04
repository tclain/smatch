import {Value, match} from '../src/smatch'


describe('Value', () => {
  it('should infer value from constructor', () => {
    const Nb = Value<number>("Bubble")
    const None = Value("None")
    const matched = match(Nb(1)).with(Nb, (value: number ) => value * 2).value()
    expect(matched).toEqual(2)
  }) 
});
/**
 * Dummy test
 */
describe("Variant test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })
})
