import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import NewsletterForm from '@/components/home/NewsletterForm.vue'

function setup() {
  const wrapper = mount(NewsletterForm, { global: { stubs: { RouterLink: RouterLinkStub } } })
  const input = wrapper.get('input[type="email"]')
  return { wrapper, input }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('NewsletterForm', () => {
  it('associe le champ à un libellé explicite', () => {
    const { wrapper } = setup()
    expect(wrapper.get('label').attributes('for')).toBe('newsletter-email')
  })

  it('signale une adresse invalide', async () => {
    const { wrapper, input } = setup()
    await input.setValue('pas-une-adresse')
    await wrapper.get('form').trigger('submit')

    expect(input.attributes('aria-invalid')).toBe('true')
    expect(wrapper.text()).toContain('semble incomplète')
  })

  it("annonce la démonstration sans prétendre avoir enregistré l'adresse", async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const { wrapper, input } = setup()
    await input.setValue('prenom@exemple.fr')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.text()).toContain('ni envoyée ni enregistrée')
    expect(wrapper.text()).not.toMatch(/inscription (confirmée|réussie)/i)
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
