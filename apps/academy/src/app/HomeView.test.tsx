import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import HomeView from './HomeView'

describe('WS-02 academy home', () => {
  it('renders the Spanish placeholder', () => {
    const html = renderToStaticMarkup(<HomeView />)
    expect(html).toContain('Academia Bolthorn')
    expect(html).toContain('Cursos interactivos de programación. Próximamente.')
  })
})
