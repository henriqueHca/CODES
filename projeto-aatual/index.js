import {Cliente} from "./Cliente.js";
import {ContaCorrente} from "./ContaCorrente.js"

const cliente1 = new Cliente("Henrique", 18802118744);
const cliente2 = new Cliente("Patrick", 19954815541);


const contaCorrenteHenrique = new ContaCorrente(cliente1, 1001);

contaCorrenteHenrique.depositar(500);

const conta2 = new ContaCorrente(cliente2, 102);
 

contaCorrenteHenrique.transferir(200, conta2);

console.log(ContaCorrente.numeroDeContas);

