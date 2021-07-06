# Regex parser

parses simple regular expressions and creates an deterministic finite automata.

The grammar for the regular expressions is 

```
// $ is used to indicate the inputs end
S        -> <regex>$
<regex>  -> <concat> A1
A1       -> '|' <regex> | ɛ
<concat> -> <rep> A2
A2       -> <concat> | ɛ
<rep>    -> <atom> A3
A3       -> '*' | ɛ
// € is used as epsilon
<atom>   -> '(' <regex> ')' | ['a'...'z','€']
```
> Source: Technical University of Munich - TUM Department of Informatics - Informatics 2 - Chair for Formal Languages, Compiler Construction, Software Construction, lecture compiler construction