class CreateResultados < ActiveRecord::Migration[6.0]
  def change
    create_table :resultados do |t|
      t.integer :id_user
      t.integer :id_job
      t.float :resultado

      t.timestamps
    end
  end
end
