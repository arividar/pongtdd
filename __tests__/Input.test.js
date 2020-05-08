import Input from '../js/Input.js'

describe('Input class tests', () => {
  describe('constructor', () => {
    test('Input creation', () => {
      const input = new Input()
      expect(input).toBeDefined()
      expect(input.IsLeftKeyPressed).toBeFalsy()
      expect(input.IsRightKeyPressed).toBeFalsy()
    })

    test('Input creation should add input-handlers to document', () => {
      let spyOnAddEventListener = jest.spyOn(
        thisGlobal.document,
        'addEventListener'
      )
      const input = new Input()
      expect(spyOnAddEventListener).toHaveBeenCalledTimes(3)
    })
  })
})
