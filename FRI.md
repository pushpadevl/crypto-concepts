<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# FRI Communication Game: An Interactive Protocol Between Prover and Verifier

The Fast Reed-Solomon Interactive Oracle Proof of Proximity (FRI) protocol can be elegantly presented as a **communication game** between two parties: an untrusted but powerful **Prover** and a trusted but computationally bounded **Verifier**. This game demonstrates how polynomial commitment and low-degree testing work through strategic interaction and mathematical transformations.

![FRI Communication Game: Interactive Protocol Between Prover and Verifier](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/94240729a2298744f57f7e71c4cb8811/cf33fd99-f7ed-49f1-87d3-2a30c7f46ad4/c6f26fa9.png)

FRI Communication Game: Interactive Protocol Between Prover and Verifier

## Game Setup and Objective

In this communication game, the **Prover's goal** is to convince the Verifier that a committed polynomial has a bounded degree without revealing the polynomial itself[^1][^2]. The **Verifier's goal** is to verify this claim efficiently using minimal queries while maintaining strong security guarantees[^3][^4].

The game operates over a finite field (in our example, \$ \mathbb{F}_{13} \$) with a specified evaluation domain. The Prover commits to a Reed-Solomon codeword representing polynomial evaluations, while the Verifier uses randomness and consistency checks to detect any cheating attempts[^1][^5].

## Round-by-Round Communication Flow

### Initial Setup Phase

The Prover begins with a polynomial \$ f_0(x) = 3x^3 + 2x^2 + x + 5 \$ of degree 3. They evaluate this polynomial over the domain \$ D = \{1, 2, 3, 4, 5, 6, 7, 8\} \$ to create a Reed-Solomon codeword: \$ [^6][^2][^7][^8][^2][^9] \$[^5][^4].

**Prover's Action**: Computes a Merkle tree commitment to these evaluations and sends the root `ROOT_0` to the Verifier. This commitment binds the Prover to their claimed polynomial without revealing its coefficients[^7][^10].

### Commit Phase - Round 1

**Verifier's Action**: Sends a random challenge \$ \alpha_1 = 7 \$ to the Prover[^1][^5].

**Prover's Polynomial Transformation**: The Prover performs the core **folding operation** by:

1. **Splitting** the polynomial into even and odd parts: \$ f_0(x) = (2x^2 + 5) + x(3x^2 + 1) \$
2. **Rewriting** using substitution \$ y = x^2 \$: \$ f_0(x) = f_e(x^2) + x \cdot f_o(x^2) \$
3. **Folding** with the challenge: \$ f_1(y) = f_e(y) + \alpha_1 \cdot f_o(y) = (2y + 5) + 7(3y + 1) = 10y + 12 \$[^5][^11]

This transformation **halves the degree** from 3 to 1 while maintaining the polynomial's essential properties. The Prover evaluates \$ f_1 \$ on the new domain (squares of original domain elements) and sends commitment `ROOT_1`[^1][^4].

### Commit Phase - Round 2

**Verifier's Action**: Sends another random challenge \$ \alpha_2 = 3 \$[^5].

**Prover's Final Transformation**: The Prover applies folding again:

- \$ f_1(y) = 12 + y \cdot 10 \$ splits into constant even and odd parts
- Final folding: \$ f_2 = 12 + 3 \cdot 10 = 3 \$ (constant polynomial)[^5][^11]

The polynomial is now reduced to **degree 0**, completing the commit phase[^1][^10].

### Query Phase - Verification

**Verifier's Action**: Queries a random index \$ z = 1 \$ to test consistency[^1][^3].

**Prover's Response**: Provides:

- \$ f_0(1) = 11 \$ and \$ f_0(-1) = 3 \$
- Merkle authentication paths proving these values belong to the committed trees[^7][^4]

**Verifier's Consistency Check**: Uses the **folding verification formula**:
\$ f_1(z^2) = \frac{f_0(z) + f_0(-z)}{2} + \alpha_1 \cdot \frac{f_0(z) - f_0(-z)}{2z} \$

Computing: \$ f_1(1) = \frac{11 + 3}{2} + 7 \cdot \frac{11 - 3}{2} = 7 + 28 = 9 \pmod{13} \$

This matches the direct evaluation of \$ f_1(1) = 10 \cdot 1 + 12 = 9 \$, confirming consistency[^5][^11].

## Mathematical Transformations on the Prover's Side

The **polynomial folding** represents the most sophisticated aspect of the Prover's strategy. Each round involves:

**Decomposition**: Any polynomial \$ f(x) \$ of degree \$ d \$ can be uniquely written as \$ f(x) = f_e(x^2) + x \cdot f_o(x^2) \$, where \$ f_e \$ contains even-degree terms and \$ f_o \$ contains odd-degree terms[^5][^11].

**Random Linear Combination**: Using the Verifier's challenge \$ \alpha \$, the Prover computes \$ g(y) = f_e(y) + \alpha \cdot f_o(y) \$, which has degree at most \$ d/2 \$[^1][^5].

**Domain Reduction**: The new evaluation domain becomes \$ \{y : y = x^2 for some x in original domain\} \$, effectively halving the domain size[^4][^11].

This process continues logarithmically until reaching a constant polynomial, achieving **exponential degree reduction** with minimal communication[^1][^7].

## Game Theory and Security Analysis

### Soundness Properties

The game's security relies on the **probabilistic nature** of the Verifier's challenges. If the Prover attempts to cheat by committing to a high-degree polynomial, the random folding challenges make it exponentially unlikely that all consistency checks will pass[^1][^8].

**Correlated Agreement Principle**: The folding operation preserves distance properties of Reed-Solomon codes, ensuring that polynomials far from the claimed degree will produce inconsistent folded evaluations with high probability[^11][^8].

### Completeness Guarantees

For an honest Prover with a genuinely low-degree polynomial, all consistency checks will pass with probability 1, as the mathematical relationships hold exactly[^3][^4].

### Communication Efficiency

The game achieves **logarithmic communication complexity**: \$ O(\log d) \$ rounds, \$ O(\log d) \$ queries, and \$ O(\log d) \$ total communication, compared to the naive \$ O(d) \$ approach of sending all coefficients[^1][^7][^12].

## Comparison with Traditional Proof Systems

| Aspect | FRI Communication Game | Traditional Polynomial Commitment |
| :-- | :-- | :-- |
| **Interaction** | Multi-round interactive | Single-round non-interactive |
| **Prover Work** | \$ O(d \log d) \$ | \$ O(d^2) \$ or requires trusted setup |
| **Verifier Work** | \$ O(\log d) \$ | \$ O(d) \$ |
| **Communication** | \$ O(\log d) \$ | \$ O(d) \$ |
| **Setup** | Transparent | May require trusted setup |
| **Post-Quantum** | Yes | Depends on assumptions |

The FRI communication game represents a **breakthrough in efficient verification**, enabling practical deployment of polynomial commitment schemes in zero-knowledge proof systems like STARKs[^7][^12]. The interactive nature, rather than being a limitation, becomes a strength that enables unprecedented efficiency while maintaining cryptographic security[^1][^4].

This game-theoretic framework has found applications beyond pure cryptography, inspiring **neural interactive proofs** and other machine learning verification protocols where powerful but untrusted systems must convince smaller, trusted verifiers of their claims[^13][^14].

<div style="text-align: center">⁂</div>

[^1]: https://blog.kroma.network/brain-fri-ed-diving-into-the-fri-protocol-and-more-85e979ee39fc

[^2]: https://www.zkm.io/blog/the-deep-fri-protocol

[^3]: https://hackmd.io/@deanstef/SJTT3MDhC

[^4]: https://aszepieniec.github.io/stark-anatomy/fri.html

[^5]: https://hackmd.io/@teddav/HykU7-zGex

[^6]: https://people.cs.georgetown.edu/jthaler/JTBootCamp.pdf

[^7]: https://dev.risczero.com/reference-docs/about-fri

[^8]: https://hackmd.io/@pgaf/HkKs_1ytT

[^9]: https://www.cs.jhu.edu/~abhishek/classes/CS600-442-Fall2016/S10.pdf

[^10]: https://blog.kroma.network/brain-fri-ed-diving-into-the-fri-protocol-and-more-85e979ee39fc?gi=f3881ffe4e74

[^11]: https://www.usenix.org/system/files/conference/usenixsecurity25/sec25cycle1-prepub-813-guo-yanpei.pdf

[^12]: https://www.iacr.org/archive/eurocrypt2022/132760101/132760101.pdf

[^13]: https://arxiv.org/html/2412.08897v2

[^14]: https://ar5iv.labs.arxiv.org/html/2108.12099

[^15]: https://eccc.weizmann.ac.il/report/2017/134/revision/2/download/

[^16]: https://clickup.com/blog/communication-games-for-teams/

[^17]: https://drops.dagstuhl.de/storage/00lipics/lipics-vol107-icalp2018/LIPIcs.ICALP.2018.14/LIPIcs.ICALP.2018.14.pdf

[^18]: https://www.surfoffice.com/blog/communication-games-activities

[^19]: https://github.com/maxgillett/halo2-fri-gadget

[^20]: https://positivepsychology.com/communication-games-and-activities/

[^21]: https://docs.rs/winter-fri/latest/winter_fri/

[^22]: https://crypto.stanford.edu/cs355/19sp/lec3.pdf

[^23]: https://www.math.toronto.edu/swastik/deep-fri.pdf

[^24]: https://en.wikipedia.org/wiki/Reed–Solomon_error_correction

[^25]: https://blog.lambdaclass.com/how-to-code-fri-from-scratch/

[^26]: https://citeseerx.ist.psu.edu/document?repid=rep1\&type=pdf\&doi=459ae6d4b77a1a59767cfcacfe70eada9cf13f98

[^27]: https://people.cs.georgetown.edu/jthaler/COSC544/Lecture2slides.pdf

[^28]: https://www.iacr.org/archive/tcc2016b/99850156/99850156.pdf

[^29]: https://people.eecs.berkeley.edu/~venkatg/teaching/ECC-fall22/scribes/lecture19.pdf

[^30]: https://cris.bgu.ac.il/en/publications/local-proofs-approaching-the-witness-length

[^31]: https://en.wikipedia.org/wiki/Interactive_proof_system

[^32]: https://www.cs.purdue.edu/homes/hmaji/teaching/Spring 2017/lectures/13.pdf

[^33]: https://dl.acm.org/doi/10.1007/978-3-662-53644-5_2

[^34]: https://crypto.stackexchange.com/questions/109674/how-does-the-verification-step-operations-using-fri-polynomial-commitments-in-zk

[^35]: https://tomverbeure.github.io/2022/08/07/Reed-Solomon.html

[^36]: https://veridise.com/blog/learn-blockchain/zk-fundamentals-proof-systems/

[^37]: https://www.cs.cmu.edu/~guyb/realworld/reedsolomon/reed_solomon_codes.html

[^38]: https://rdi.berkeley.edu/zkp-course/assets/lecture8.pdf

[^39]: https://courses.cs.washington.edu/courses/cse532/04sp/lect09.pdf

[^40]: https://arxiv.org/pdf/2108.12099.pdf

[^41]: https://rdi.berkeley.edu/zkp-course/assets/lecture7.pdf

[^42]: https://www.cs.cmu.edu/~venkatg/teaching/codingtheory/notes/notes6.pdf

[^43]: https://xord.com/research/2d-reed-solomon-encoded-merkle-tree-construction/

[^44]: https://blog.electisec.com/fri

[^45]: https://arxiv.org/abs/2301.08295

[^46]: https://openreview.net/pdf?id=FqRHeQTDU5N

[^47]: https://www.diva-portal.org/smash/get/diva2:833161/FULLTEXT01.pdf

[^48]: https://www.geeksforgeeks.org/digital-logic/what-is-reed-solomon-code/

