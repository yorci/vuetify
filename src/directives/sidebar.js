var defaults = {}

function directive (el, binding, v) {
  let config = {}

  Object.assign(
    config,
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  )

  el.setAttribute('data-sidebar', config.value)

  el.onclick = e => {
    e.preventDefault()
    
    v.context.$vuetify.bus.pub(`sidebar:toggle:${config.value}`)
  }
}

export default {
  bind (el, binding, v) {
    v.context.$vuetify.load.call(
      v.context,
      () => directive(el, binding, v)
    )
  },

  updated (el, binding, v) {
    directive(el, binding, v)
  },

  componentUpdated (el, binding, v) {
    directive(el, binding, v)
  },

  unbind (el) {
    el.removeAttribute('data-sidebar')
    el.removeAttribute('onclick')
  }
}