const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name:"Grade",

    columns: {
        id:{
            primary:true,
            generated: true,
            type: "int",
        },
        note:{
            type: "int",
            unique: true,
        },
        

    },
    relations: {
        gradeSkill: {
            target: "Skill",
            type: "one-to-one",
            joinTable: true,
            eager: true
        }
    }
    
})