import * as idGenerator from './id-generator';

it('generation of id', () => {
    expect(idGenerator.id()).toMatch(/[a-z0-9]{4}\-[a-z0-9]{4}/);
});
