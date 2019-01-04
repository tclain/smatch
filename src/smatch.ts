

/** A container taking a valye */
export type Container<T= any> = {
  meta: string
  type: string
  value: T
}
export type OneOf<Values extends Container[]> = keyof Values


export const Value = <T = any>(Name: string) => {
  const ValueEnclose = <T>(value:T): Container<T> => ({
    meta: "Value",
    type: Name,
    value
  })
  // @ts-ignore
  ValueEnclose.meta === Name
  return ValueEnclose
}

export function isContainer<Input>(value: Input | Container<Input>): value is Container<Input> {
  return (value as any).meta === "Value"
}


export function match<Input = any>(value: Input | Container<Input>) {
  const steps: any[] = []
  return {
    with(variant: Container<Input> | any, action: (value: Input) => any) {
      steps.push([variant, action])
      return this
    },
    value() {
      const step = steps.find(([variant, action]) => {
        let actualValue = value
        if(isContainer(value)){
          actualValue = value.value
          return value.type === variant.meta
        }
        console.log('searching for', value, variant)
        return variant === actualValue || typeof variant === typeof value
      })
      console.log(step);
      if (!step) return undefined
      const [variant, action] = step
      return action(value)
    }
    
  }
}