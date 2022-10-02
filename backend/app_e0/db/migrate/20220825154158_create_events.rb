class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :type
      t.float :lat
      t.float :lon
      t.string :location
      t.string :message
      t.integer :level

      t.timestamps
    end
  end
end
