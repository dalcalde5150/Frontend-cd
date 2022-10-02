class CreateJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :jobs do |t|
      t.integer :user_id
      t.integer :event_id
      t.integer :job_id

      t.timestamps
    end
  end
end
