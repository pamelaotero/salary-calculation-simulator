function reset(){
  document.getElementById('primeira-secao').hidden = false;
  document.getElementById('segunda-secao').hidden = true;
  document.getElementById('salario').value = ""
  document.getElementById('salario_bemol').value = 0
  document.getElementById('valor_governo').value = 0
  document.getElementById('total').value = 0
  /* adicionei essa linha pam */
  document.getElementById('calcular').disabled = true; 

}
function verfSalario(){
  var salario = parseFloat(document.getElementById('salario').value.replace("R$ ", "").replace(".", "").replace(",", "."));
  if (salario > 0.00) {
    document.getElementById('calcular').disabled = false;
  }else{
    document.getElementById('calcular').disabled = true;
  }
}
function calc() {
  document.getElementById('primeira-secao').hidden = true;
  document.getElementById('segunda-secao').hidden = false;
  var aliquota_inss = 0
  var faixa_inss = 0

  var salario = document.getElementById('salario').value.replace("R$ ", "").replace(".", "").replace(",", ".")
  salario = parseFloat(salario)
  if (salario < 0) {
    alert("Digite um valor válido")
  }else{
    valor_governo = retorna_valor_governo(salario)

    /*calculo para todos salarios em todas as faixas*/

    /*############################# 25% ###################################*/

    if (document.getElementById('radio_25').checked) {
      salario = salario * 0.75

      valor_inss = retorna_inss(salario)

      salario_menos_inss = (salario - valor_inss) //operacao
      valor_imposto = retorna_imposto(salario_menos_inss)

      //SALARIO BEMOL
      salario_bemol = salario - (valor_imposto + valor_inss)

      //VALOR SEGURO
      valor_governo = (valor_governo * 0.25)
      //SOMA TOTAL
      total = salario_bemol + valor_governo
    }

    /*############################# 50% ###################################*/

    if (document.getElementById('radio_50').checked) {
      salario = salario * 0.50

      valor_inss = retorna_inss(salario)

      salario_menos_inss = (salario - valor_inss) //operacao
      valor_imposto = retorna_imposto(salario_menos_inss)

      //SALARIO BEMOL
      salario_bemol = salario - (valor_imposto + valor_inss)
      //VALOR DO SEGURO 
      valor_governo = (valor_governo * 0.5)
      //SOMA TOTAL
      total = salario_bemol + valor_governo
    }

    /*############################# 100% ###################################*/

    if (document.getElementById('radio_100').checked) {
      salario = salario * 0.30

      //SALARIO BEMOL
      salario_bemol = salario
      //VALOR SEGURO
      valor_governo = valor_governo * 0.7
      //SOMA TOTAL
      total = salario_bemol + valor_governo
    }
  }
    //ESCREVENDO NA TELA
    document.getElementById('salario_bemol').value = "R$ " + salario_bemol.toFixed(2).replace(".", ",")
    document.getElementById('valor_governo').value = "R$ " + valor_governo.toFixed(2).replace(".", ",")
    document.getElementById('total').value = "R$ " + total.toFixed(2).replace(".", ",")
} //fim da função


/*############################ GOVERNO SEGURO ######################*/

function retorna_valor_governo(salario) {
  var valor_governo = 0

  if (salario > 0 && salario <= 1000) {
    valor_governo = 522.50
  }

  if (salario > 1000 && salario <= 1599.61) {
    valor_governo = salario * 0.8

    if (valor_governo < 1045) {
      valor_governo = 1045 /* modificacao do joas*/
    }
  }


  if (salario > 1599.61 && salario <= 2666.29) {
    valor_governo = ((salario - 1599.61) * 0.50) + 1279.69
  }

  if (salario > 2666.29) {
    valor_governo = 1813.03
  }
  return valor_governo
}


/*############################## INSS #################################*/

//  salario_reduzido_porcentagem = salario
function retorna_inss(salario) {
  var aliquota_inss = 0
  var faixa_reducao_inss = 0
  var resultado_inss = 0

  if (salario > 0 && salario <= 1045) {
    aliquota_inss = 0.075
    faixa_reducao_inss = 0
    resultado_inss = salario * aliquota_inss - faixa_reducao_inss
  }

  if (salario > 1045 && salario <= 2089.6) {
    aliquota_inss = 0.09
    faixa_reducao_inss = 15.67
    resultado_inss = salario * aliquota_inss - faixa_reducao_inss
  }

  if (salario > 2089.6 && salario <= 3134.4) {
    aliquota_inss = 0.12
    faixa_reducao_inss = 78.36
    resultado_inss = salario * aliquota_inss - faixa_reducao_inss
  }

  if (salario > 3134.4 && salario <= 6101.16) {
    aliquota_inss = 0.14
    faixa_reducao_inss = 141.05
    resultado_inss = salario * aliquota_inss - faixa_reducao_inss
  }

  if (salario > 6101.16) {
    aliquota_inss = 0
    faixa_reducao_inss = 713.09
    resultado_inss = faixa_reducao_inss
  }

  return resultado_inss

}//fim da função retorna inss



// ####################### IR IMPOSTO DE RENDA ##################

// salario_alterado_menos_inss = salario

function retorna_imposto(salario) {

  resultado_inss = retorna_inss(salario)

  var aliquota_imposto = 0
  var faixa_reducao_imposto = 0
  var resultado_imposto = 0

  if (salario > 0 && salario <= 1903.98) {
    aliquota_imposto = 0.00;
    faixa_reducao_imposto = 0;
    resultado_imposto = (salario) * aliquota_imposto - faixa_reducao_imposto
  }

  if (salario > 1903.98 && salario <= 2826.65) {
    aliquota_imposto = 0.075;
    faixa_reducao_imposto = 142.80;
    resultado_imposto = (salario) * aliquota_imposto - faixa_reducao_imposto
  }

  if (salario > 2826.65 && salario <= 3751.05) {
    aliquota_imposto = 0.15;
    faixa_reducao_imposto = 354.8;
    resultado_imposto = (salario) * aliquota_imposto - faixa_reducao_imposto
  }

  if (salario > 3751.05 && salario <= 4664.68) {
    aliquota_imposto = 0.225;
    faixa_reducao_imposto = 636.13;
    resultado_imposto = (salario) * aliquota_imposto - faixa_reducao_imposto
  }

  if (salario > 4664.68) {
    aliquota_imposto = 0.275;
    faixa_reducao_imposto = 869.36;
    resultado_imposto = (salario) * aliquota_imposto - faixa_reducao_imposto
  }
  return resultado_imposto

}//fim da funcao retorna imposto