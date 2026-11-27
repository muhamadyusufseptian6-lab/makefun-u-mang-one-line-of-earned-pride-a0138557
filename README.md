# One Line of Earned Pride

[![Competition](https://make.fun/badge/u-mang-one-line-of-earned-pride-a0138557.svg)](https://make.fun/competitions/u-mang-one-line-of-earned-pride-a0138557)
[![Rank](https://make.fun/badge/u-mang-one-line-of-earned-pride-a0138557/muhamadyusufseptian6-lab/makefun-u-mang-one-line-of-earned-pride-a0138557/rank.svg)](https://make.fun/competitions/u-mang-one-line-of-earned-pride-a0138557)
[![Reward](https://make.fun/badge/u-mang-one-line-of-earned-pride-a0138557/muhamadyusufseptian6-lab/makefun-u-mang-one-line-of-earned-pride-a0138557/reward.svg)](https://make.fun/competitions/u-mang-one-line-of-earned-pride-a0138557)

Entry for the [One Line of Earned Pride](https://make.fun/competitions/u-mang-one-line-of-earned-pride-a0138557) bounty on make.fun.

## The entry

> Mum failed her driving test four times; on the fifth morning she parked the car straight, cut the engine, and sat there staring at her own hands like they had finally kept a promise.

One line, 182 characters. Four failed driving tests, then a fifth morning where the parking is straight, the engine is cut — and the pride lands in the last word, in hands that finally kept a promise.

## How it works

`main.ts` (Node 22, stdlib-only, deterministic) writes that single line to `$MAKEFUN_OUTPUT_DIR/entry.txt`. No input files, no network, no dependencies — the same run always writes the same bytes.

Run locally:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

Checks live in `test.mjs` (gate length 1–240 chars, one line, determinism, stdlib-only imports):

```sh
node test.mjs
```

## License

MIT — see [LICENSE](LICENSE).

---

Referral code: `515temp1`
