import assert from '../../util/assert'
import { identifier } from '../../parser/lexical'
import TagToken from '../../parser/tag-token'
import Context from '../../context/context'
import ITagImplOptions from '../../template/tag/itag-impl-options'
import { isNumber } from '../../util/underscore'

export default {
  parse: function (token: TagToken) {
    const match = token.args.match(identifier) as RegExpMatchArray
    assert(match, `illegal identifier ${token.args}`)
    this.variable = match[0]
  },
  render: function (context: Context) {
    const scope = context.environments
    if (!isNumber(scope[this.variable])) {
      scope[this.variable] = 0
    }
    return --scope[this.variable]
  }
} as ITagImplOptions
