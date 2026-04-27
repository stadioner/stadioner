import { beersCs, limosCs, watersCs } from '@/lib/products/data'
import { SHOP_DEPOSITS_CZK } from '@/lib/products/deposits'
import { PARTY_KEG_RENTAL_CZK } from '@/lib/products/party-keg-rental'
import { formatPriceCzk } from '@/lib/products/utils'
import { Container } from '@/components/container'

function cellCzk(value?: number): string {
  if (value == null) return '—'
  return `${formatPriceCzk(value)} Kč`
}

const retailRows = [...beersCs, ...limosCs, ...watersCs]

export function CompletePriceList() {
  return (
    <Container className='pb-20'>
      <section
        aria-labelledby='cenik-heading'
        className='border-t border-zinc-700 pt-12'
      >
        <h2
          id='cenik-heading'
          className='text-brand-primary mb-2 text-2xl font-bold tracking-tight md:text-3xl'
        >
          Ceník
        </h2>
        <p className='text-zinc-400 mb-6 max-w-2xl text-sm leading-relaxed md:text-base'>
          Maloobchodní ceny dle e-shopu stadioner.cz. U piv jsou uvedeny sudy z
          běžné nabídky; stočení do menších vratných sudů viz druhá tabulka.
        </p>
        <p className='text-zinc-500 mb-8 text-xs leading-relaxed md:text-sm'>
          Vratné zálohy (nad uvedené ceny): lahev{' '}
          {formatPriceCzk(SHOP_DEPOSITS_CZK.bottle)} Kč, bedna{' '}
          {formatPriceCzk(SHOP_DEPOSITS_CZK.crate)} Kč, sud{' '}
          {formatPriceCzk(SHOP_DEPOSITS_CZK.keg)} Kč.
        </p>

        <div className='overflow-x-auto rounded-sm border border-zinc-700'>
          <table className='w-full min-w-[640px] border-collapse text-left text-sm text-zinc-200'>
            <thead>
              <tr className='border-b border-zinc-700 bg-zinc-900/80'>
                <th
                  scope='col'
                  className='px-3 py-3 font-semibold text-zinc-100 md:px-4'
                >
                  Produkt
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 font-semibold text-zinc-100 md:px-4'
                >
                  Lahev
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 font-semibold text-zinc-100 md:px-4'
                >
                  Bedna (20 ks)
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 font-semibold text-zinc-100 md:px-4'
                >
                  Sud 20 l
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 font-semibold text-zinc-100 md:px-4'
                >
                  Sud 50 l
                </th>
              </tr>
            </thead>
            <tbody>
              {retailRows.map((product) => (
                <tr
                  key={product.slug}
                  className='border-b border-zinc-800 last:border-b-0 odd:bg-zinc-950/40'
                >
                  <th
                    scope='row'
                    className='px-3 py-2.5 font-medium text-zinc-100 md:px-4'
                  >
                    {product.name}
                  </th>
                  <td className='px-3 py-2.5 tabular-nums text-zinc-300 md:px-4'>
                    {cellCzk(product.bottlePriceCzk)}
                  </td>
                  <td className='px-3 py-2.5 tabular-nums text-zinc-300 md:px-4'>
                    {cellCzk(product.cratePriceCzk)}
                  </td>
                  <td className='px-3 py-2.5 tabular-nums text-zinc-300 md:px-4'>
                    {cellCzk(product.kegPricesCzk?.barrel30)}
                  </td>
                  <td className='px-3 py-2.5 tabular-nums text-zinc-300 md:px-4'>
                    {cellCzk(product.kegPricesCzk?.barrel50)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className='text-brand-primary mt-12 mb-2 text-lg font-bold md:text-xl'>
          Stočení do vratného sudu
        </h3>
        <p className='text-zinc-400 mb-6 text-sm'>
          Produkt „Stadioner soudek“ v e-shopu — rezervace nejméně týden dopředu.
          Platí též záloha za sud uvedená výše.
        </p>
        <div className='overflow-x-auto rounded-sm border border-zinc-700'>
          <table className='w-full min-w-[480px] border-collapse text-left text-sm text-zinc-200'>
            <thead>
              <tr className='border-b border-zinc-700 bg-zinc-900/80'>
                <th
                  scope='col'
                  className='px-3 py-3 font-semibold text-zinc-100 md:px-4'
                >
                  Pivo
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 font-semibold text-zinc-100 md:px-4'
                >
                  Sud 10 l
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 font-semibold text-zinc-100 md:px-4'
                >
                  Sud 20,5 l
                </th>
              </tr>
            </thead>
            <tbody>
              {PARTY_KEG_RENTAL_CZK.map((row) => (
                <tr
                  key={row.name}
                  className='border-b border-zinc-800 last:border-b-0 odd:bg-zinc-950/40'
                >
                  <th
                    scope='row'
                    className='px-3 py-2.5 font-medium text-zinc-100 md:px-4'
                  >
                    {row.name}
                  </th>
                  <td className='px-3 py-2.5 tabular-nums text-zinc-300 md:px-4'>
                    {cellCzk(row.keg10l)}
                  </td>
                  <td className='px-3 py-2.5 tabular-nums text-zinc-300 md:px-4'>
                    {cellCzk(row.keg205l)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Container>
  )
}
