import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    {
      input: 'src/cli',
      name: 'cli', 
    },
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: false,
  },
})