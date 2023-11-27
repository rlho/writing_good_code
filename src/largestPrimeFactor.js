function largestPrimeFactor(number) {
  let factor = 2; // 最初の素数

  // 与えられた数が1より大きい間繰り返し
  while (number > 1) {
    // 現在の素因数で割り切れるかチェック
    if (number % factor === 0) {
      number /= factor; // 割り切れたら数を更新
    } else {
      factor++; // 割り切れなければ次の数へ
    }
  }

  // 最終的に残ったfactorが最大の素因数
  return factor;
}

console.log(largestPrimeFactor(600851475143));
