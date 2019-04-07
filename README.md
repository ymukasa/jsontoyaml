# Readme

## About This

json形式ののテキストファイルを、複数一括でyaml形式のテキストファイルに変換するものです。  
お仕事上の都合で、自動出力した複数のjsonファイルを纏めて比較する必要がありまして、なにか良いやり方がないものか探している中で[こんな記事](https://qiita.com/RAWSEQ/items/c2ef5423bf93b37d1dae)を見て、yamlに変換できると比較が楽で良いなぁと思って作ってみた次第です。  
ついでに、このツールの特徴として、特定の項目を変換時の対象から除外するようにしてあります。比較するjsonファイルに出力時のタイムスタンプが含まれていてそのままだと必ず差分が出てしまうのでそこは対象から外しておきたかった、という事情によるものです。

## How to Use

対象となるディレクトリを指定してボタンを押すだけです。  
指定されたディレクトリ直下にあるjsonファイルを纏めてyamlに変換してくれます。サブディレクトリの中は見ないので、使用する際にはうまいことファイルを纏めてください。  
操作を行うと、指定されたディレクトリ内に `yaml` というディレクトリが作成されて、変換されたyamlファイルはそのディレクトリ内に出力されます。  
  
「除外項目」というテキストボックスにカンマ区切りで入力された項目は、yamlへの変換対象から除外されます。例えば `updateTs,createTs` という内容を入力しておくと、変換されたyamlファイルには updateTs と createTs という項目が出力されなくなります。  
  
あとは、出力されたyamlファイルを適当なdiffツールに突っ込んであげれば、まとめて内容を比較することができるようになるかと思います。
