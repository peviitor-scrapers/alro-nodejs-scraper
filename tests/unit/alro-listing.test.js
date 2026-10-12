import { describe, it, expect, beforeAll } from '@jest/globals';

// Alro's listing is a Bootstrap accordion: one .accordion-item per job, the
// permalink is the "APLICA ACUM" button inside it.
const HTML = `
<div id="accordionJobs">
  <div class="accordion-item mb-3">
    <div class="accordion-header"><button><div class="col">
      <div class="name">INGINER AUTOMATIST</div>
      <div class="date">AUTOMATIZARI INDUSTRIALE  |  2024-10-30</div>
    </div></button></div>
    <div class="accordion-body"><a href="https://www.alro.ro/cariere/detalii-job/inginer-automatist" class="buton">APLICA</a></div>
  </div>
  <div class="accordion-item mb-3">
    <div class="accordion-header"><button><div class="col">
      <div class="name">Specialist Logistică</div>
      <div class="date">LOGISTICA  |  2026-09-14</div>
    </div></button></div>
    <div class="accordion-body"><a href="https://www.alro.ro/cariere/detalii-job/specialist-logistica" class="buton">APLICA</a></div>
  </div>
</div>`;

describe('Alro listing parser', () => {
  let index;
  beforeAll(async () => { index = await import('../../scraper/index.js'); });

  it('extracts one item per accordion block with its own permalink', () => {
    const items = index.parseListing(HTML);
    expect(items.map((i) => i.title)).toEqual(['INGINER AUTOMATIST', 'Specialist Logistică']);
    expect(items.map((i) => i.url)).toEqual([
      'https://www.alro.ro/cariere/detalii-job/inginer-automatist',
      'https://www.alro.ro/cariere/detalii-job/specialist-logistica'
    ]);
  });
});