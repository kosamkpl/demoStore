# Tests for demoStore

## initial note 
This is a automated test collection for demo store tak covers part of functionalities.

## Getting started

1. pull repository. Clone onlu main branch, to avoid pulling unecessary branches.

```shell
git clone https://github.com/kosamkpl/demoStore.git --single-branch
```
2. open directory with repository and run 
```
npm install
```

3. instal playwright with browsers
```
npx playwright install --with-deps
```

4. try to run tests
Seqence of run 
Due to cache state and no permanent users available, tests should be executed in order:
- register-test /which invoke register.spec.ts
- run-after-register for other suites

5. if you use vscode, install playwright test plugin (for integrated test runner)
- https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright
 