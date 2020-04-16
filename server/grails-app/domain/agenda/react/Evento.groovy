package agenda.react

class Evento {

    Date diaEvento
    Lugar lugarEvento

    static belongsTo = [Banda]
    static hasMany = [bandas: Banda]

    static constraints = {}

    static mapping = {}
}
