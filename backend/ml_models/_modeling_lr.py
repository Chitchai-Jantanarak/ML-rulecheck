import numpy as np
import re
from sklearn.base import BaseEstimator, TransformerMixin
from dataclasses import dataclass

@dataclass
class TextStatisticsExtractor(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None): return self
    def transform(self, X):
        out = []
        rx_ellip = re.compile(r'\.{2,}')
        rx_url   = re.compile(r'http\S+|www\.\S+')
        rx_ment  = re.compile(r'u/\w+')
        rx_sub   = re.compile(r'r/\w+')
        rx_aggrs = [re.compile(p) for p in [
            r"\byou're\s+\w+", r"\byour\s+\w+", r"\bshut\s+up\b", r"\bget\s+lost\b", r"\bgo\s+away\b"
        ]]
        bad = ['fuck','shit','damn','ass','bitch','hell', 'sex']
        for t in X:
            s = t if isinstance(t, str) else str(t)
            char_n = len(s); word_n = max(1, len(s.split()))
            out.append([
                char_n,
                word_n,
                char_n/word_n,
                sum(c.isupper() for c in s)/max(1, char_n),
                s.count('!'),
                s.count('?'),
                len(rx_ellip.findall(s)),
                len(rx_url.findall(s)),
                len(rx_ment.findall(s)),
                len(rx_sub.findall(s)),
                sum(s.lower().count(w) for w in bad),
                sum(len(rx.findall(s.lower())) for rx in rx_aggrs),
            ])
        return np.asarray(out, dtype=float)

@dataclass
class RuleContextExtractor(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None): return self
    def _tok(self, s):
        if not isinstance(s, str): s = "" if s is None else str(s)
        return set(re.findall(r"[A-Za-z0-9_']+", s.lower()))
    def _j(self, a, b):
        a, b = set(a), set(b); u = len(a|b); return (len(a&b)/u) if u else 0.0
    def transform(self, X):
        feats = []
        for _, r in X.iterrows():
            tb = self._tok(r['body']); tr = self._tok(r['rule'])
            tp1 = self._tok(r['positive_example_1']); tp2 = self._tok(r['positive_example_2'])
            tn1 = self._tok(r['negative_example_1']); tn2 = self._tok(r['negative_example_2'])
            overlap = len(tb & tr); ratio = overlap / max(1, len(tr))
            jp1, jp2 = self._j(tb,tp1), self._j(tb,tp2)
            jn1, jn2 = self._j(tb,tn1), self._j(tb,tn2)
            pos_max, neg_max = max(jp1,jp2), max(jn1,jn2)
            pos_avg, neg_avg = (jp1+jp2)/2, (jn1+jn2)/2
            feats.append([
                overlap, ratio, jp1, jp2, jn1, jn2,
                pos_max, neg_max, pos_avg, neg_avg,
                pos_max-neg_max, pos_avg-neg_avg
            ])
        return np.asarray(feats, dtype=float)
