import allExceptions from '../constants/exceptions'

export default function getExceptionsStr(e, lang) {
  return e.map((id) => allExceptions[id][lang]).join(', ') || '-'
}
