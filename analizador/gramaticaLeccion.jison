/* description: Parses end executes mathematical expressions. */

/* lexical grammar */

%lex
%options case-insensitive
digit                       [0-9]
esc                         "\\"
int                         "-"?(?:[0-9]|[1-9][0-9]+)
exp                         (?:[eE][-+]?[0-9]+)
frac                        (?:\.[0-9]+)

%{


  %}

%%


\s+                   /* skip whitespace */
\/\/[^\n]*                                                   /* skip comment */return 'COMENTARIO1'
"/*"[^"*/"]*"*/"                                           /*ignore */return 'COMENTARIO'
"fin-si"                                                    return 'FIN'
'{%' 														 return '{%'
'%}' 														 return '%}'
"+="                                                        return '+='
"++"                                                        return '++'
"--"                                                        return '--'
"*="                                                        return '*='
"/="                                                        return '/='
"+="                                                        return '+='
"->"                                                        return '->'
"*"                                                         return '*'
"/"                                                         return '/'
"-"                                                         return '-'
"+"                                                         return '+'
"^"                                                         return '^'
"("                                                         return '('
")"                                                         return ')'
"%"                                                         return '%'

"<="                                                        return '<='
">="                                                        return '>='
"=="                                                        return '=='
"!="                                                        return '!='

"<"                                                         return '<'
">"                                                         return '>'
"??"                                                        return '??'     


"&&"                                                        return '&&'
"||"                                                        return '||'
"|&"                                                        return '|&'
"&?"                                                        return '&?'
"|?"                                                        return '|?'
"!"                                                         return '!'             

";"                                                          return ';'
","                                                          return ','
"{"                                                          return '{'
"}"                                                          return '}'
"["                                                          return '['
"]"                                                          return ']'                                                         
":"                                                          return ':'
"@sobreescribir"            								 return 'SOBREESCRIBIR'

                                        
"\""[^\"]*"\""                                              return 'STRINGLIST';
{int}{frac}{exp}?\b                                         return 'NUMBERLIST2';
{int}{exp}?\b                                               return 'NUMBERLIST';

['][^\n][']                                                 return 'CARACTER'
['][\\][0][']                                               return 'NULO'
"."                                                         return '.'
"="                                                         return '='
[A-Za-z_0-9_]+                                              return 'ID';
\/(?:[^\/]|"\\/")*\/                                        return 'REGEX'
<<EOF>>                                                      return 'EOF'

. 															return 'ERROR'

/lex

/* operator associations and precedence */

%left '||' 
%left '??'
%left '&&' 
%left '!' 
%left '==' '!=' '>' '<' '>=' '<='

%left '+' '-'
%left '*' '/' '%'
%left '^' 
%left UMINUS
%left COMENTARIO


%start inicio
%error-verbose
%% /* language grammar */
inicio:Encabezado EOF { $$ = parser.treeparser.leccion; return parser.treeparser.leccion }
  ; 
Encabezado
	: Encabezado Leccion {$$ = parser.treeparser.leccion}
	| Leccion {$$ = parser.treeparser.leccion}
	;

Leccion
	:'{%' '%}'
	|'{%' Atrubutos '%}'{parser.treeparser.leccion.push($2);}
	;
Atrubutos
	:Atrubutos Atributo {atrubuto.push($2); $$ = atrubuto;}
	| Atributo  {atrubuto = []; atrubuto.push($1); $$ = atrubuto;}
	;
 Atributo
 	: ID ll1 Cuerpo '}'{
            parser.treeparser.contador--; 
 			tab = ""; 
			for (var i = 0; i < parser.treeparser.contador; i++) {
				tab = tab + "    " ;
			}
			valor =$1 + $2+ "\n"+ tab+$3 +"\n" +tab+$4 
			nodo = new Nodo($1,$3 ); 
 		 $$ =nodo;
 	}
 	;
 Cuerpo
 	: Cuerpo Lexico{$$ = $1 + ""+$2;}
 	
 	| Lexico {tab = ""; 
			for (var i = 0; i < parser.treeparser.contador; i++) {
				tab = tab + "    " ;
			} $$ = " " + tab +$1;}
 	;

ll1
: '{' {parser.treeparser.contador ++;  tab = ""; 
			for (var i = 0; i < parser.treeparser.contador; i++) {
				tab = tab + "    " ;
			}   $$ = $1 ;}
;
 Lexico 
 	:  ll1 Cuerpo '}'{tab = ""; 
			for (var i = 0; i < parser.treeparser.contador; i++) {
				tab = tab + "    " ;
			}parser.treeparser.contador--; $$ = $1 +"\n"+ $2+ "\n"+tab +$3 ;}
 	| ll1 '}'{parser.treeparser.contador--; $$ = $1 +"\n"+ $2+ "\n" +tab+$3 ;}
 	| COMENTARIO1{$$ = $1+"\n" ;}
 	| COMENTARIO{$$ = $1+"\n" ;}
	| SOBREESCRIBIR  {$$ = $1 ;}                                  
	| STRINGLIST{$$ = $1 ;}
	| NUMBERLIST2{$$ = $1+" " ;}
	| NUMBERLIST{$$ = $1+" " ;}
	| ID{$$ = $1+" ";}
	| CARACTER{$$ = $1 ;}
	| OP{$$ = $1 ;}
	| FIN{$$ = $1 ;}
 	;
 
OP
	:'++' {$$ = $1+" " ;}
	|'--' {$$ = $1+" " ;}
	|'*=' {$$ = $1+" " ;}
	|'/=' {$$ = $1+" " ;}
	|'+=' {$$ = $1+" " ;}
	|'->' {$$ = $1+" " ;}
	|'('  {$$ = $1+" " ;}
	|')'  {$$ = $1+" " ;}
	|'!'  {$$ = $1 ;} 
	|'*'  {$$ = "" + $1 +" " ;}
	|'/'  {$$ = "" + $1 +"" ;}
	|'-'  {$$ = "" + $1 +" " ;}
	|'+'  {$$ = "" + $1 +" " ;}
	|'^'  {$$ = "" + $1 +" " ;}
	
	|'<=' {$$ = "" + $1 +" " ;}
	|'>=' {$$ = "" + $1 +" " ;}
	|'==' {$$ = "" + $1 +" " ;}
	|'!=' {$$ = "" + $1 +" " ;}
	|'<'  {$$ = "" + $1 +" " ;}
	|'>'  {$$ = "" + $1 +" " ;}
	|'??' {$$ = "" + $1 +" " ;}  
	|'&&' {$$ = "" + $1 +" " ;}
	|'||' {$$ = "" + $1 +" " ;}
	|'|&' {$$ = "" + $1 +" " ;}
	|'&?' {$$ = "" + $1 +" " ;}
	|'|?' {$$ = "" + $1 +" " ;}
	|'='  {$$ = "" +$1 + " " ;}
	
	|','  {$$ = $1 +" " ;}
	|'['  {$$ = $1 ;}
	|']'  {$$ = $1 +" ";}                                                     
	|'.'  
	
	| ERROR {$$ = "//"+$1+"\n" ;}  
	|':'  { 
		 tab = ""; 
		for (var i = 0; i < parser.treeparser.contador; i++) {
		tab = tab + "    " ;
		} 
		$$ = $1 +"\n" +tab;}
	|';' {
			 tab = ""; 
			for (var i = 0; i < parser.treeparser.contador; i++) {
				tab = tab + "    " ;
			} 
		$$ = $1 +"\n" +tab;
		}
 ;	

%%


parser.treeparser  = {
 raiz : null,
 contador: 0,
 leccion : []
};



function Nodo ( nombre, cuerpo) {
  this.nombre =nombre;
  this.cuerpo = cuerpo;
} 
