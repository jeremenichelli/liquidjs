import assert from 'src/util/assert'
import { identifier } from 'src/parser/lexical'
import { AssignScope } from 'src/scope/scopes'
import TagToken from 'src/parser/tag-token';
import Scope from 'src/scope/scope';
import ITagImplOptions from 'src/template/tag/itag-impl-options';

const re = new RegExp(`(${identifier.source})\\s*=([^]*)`)

export default {
  parse: function (token: TagToken) {
    const match = token.args.match(re) as RegExpMatchArray
    assert(match, `illegal token ${token.raw}`)
    this.key = match[1]
    this.value = match[2]
  },
  render: function (scope: Scope) {
    const ctx = new AssignScope()
    ctx[this.key] = this.liquid.evalValue(this.value, scope)
    scope.push(ctx)
    return Promise.resolve('')
  }
} as ITagImplOptions