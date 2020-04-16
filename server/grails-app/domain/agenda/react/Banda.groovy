package agenda.react

class Banda {

    String nome
    String genero

    static hasMany = [eventos: Evento]

    static constraints = {
        nome nullable: false
        genero nullable: false, inList: ['Axé', 'Forró', 'Rock']
    }
}
