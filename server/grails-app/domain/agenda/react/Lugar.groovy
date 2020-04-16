package agenda.react

class Lugar {

    String nome
    Integer capacidade

    //um lugar pode ter varios eventos 1 -> n. hasMany cria uma chave dentro de 'Evento'
    static hasMany = [eventos: Evento]

    static constraints = {
        nome nullable: false
        capacidade min: 1
    }
}
