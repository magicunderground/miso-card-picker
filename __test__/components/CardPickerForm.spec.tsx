import * as React from 'react'
import { CardPickerForm } from '../../src/components/CardPickerForm'
import { expect } from 'chai'
import * as chai from 'chai'
import { shallow } from 'enzyme'
import * as enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as chaiEnzyme from 'chai-enzyme'
import { AsyncResource } from 'async_hooks';

chai.use(chaiEnzyme())
enzyme.configure({ adapter: new Adapter() })

// Helper to allow async tasks to complete
function switchContext(): Promise<void> {
    return new Promise<void>(resolve => {
        setInterval(resolve, 0)
    })
}

describe('when a name is typed', () => {
    it('should populate the suggestions', async () => {
        let mockComplete = async () => {
            return new Array<string>('one', 'two', 'three')
        }

        let component = shallow(<CardPickerForm autocomplete={mockComplete} />)
        component.find('input').simulate('change', { target: { value: 'test' } })

        await switchContext()

        component.update()

        let options = component.find('option')
        expect(options.length).to.equal(3)
        options.forEach((option, index) => {
            expect(option.key()).to.eq(index.toLocaleString())
        })
    })
})

describe('when form is submitted', () => {
    it('should call the callback', async () => {
        let completer = async (name: string) => {
            return new Array<string>(name)
        }

        let wasSubmitted = false
        let submitter = (name: string) => {
            wasSubmitted = true
        }

        let component = shallow(<CardPickerForm autocomplete={completer} onSubmit={submitter} />)
        component.find('form').simulate('submit', { preventDefault: () => {} })

        await switchContext()

        expect(wasSubmitted).to.be.true
    })
})